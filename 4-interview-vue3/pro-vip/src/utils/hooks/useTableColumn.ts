import { ref, reactive, Ref, watch } from 'vue';
import { TableColumn } from '@/typing';

export type DynamicColumnItem = {
  key: string;
  label: string;
  checked: boolean;
};

export type DynamicColumnState = {
  checkAll: boolean;
  checkedList: string[];
  indeterminate: boolean;
};

export interface DynamicColumns {
  dynamicColumns: Ref<TableColumn[]>;
  dynamicColumnItems: Ref<DynamicColumnItem[]>;
  state: DynamicColumnState;
  reset: () => void;
  handleColumnChange: (e: Event, column: DynamicColumnItem) => void;
  handleColumnAllClick: (e: Event) => void;
  move: (index: number, targetIndex: number) => void;
}

export const useTableDynamicColumns = (columns: TableColumn[], checkAll = true): DynamicColumns => {
  const state = reactive<DynamicColumnState>({
    checkAll: true,
    checkedList: [],
    indeterminate: true,
  });
  const dynamicColumns = ref(columns);

  const dynamicColumnItems: Ref<DynamicColumnItem[]> = ref(
    columns.map(column => {
      return {
        key: column?.key || column.dataIndex,
        label: column.title,
        checked: checkAll,
      } as DynamicColumnItem;
    }),
  );
  const dynamicColumnValues: string[] = dynamicColumnItems.value.map(column => column.key);

  state.checkedList = dynamicColumnValues;
  state.checkAll = checkAll;
  state.indeterminate = !checkAll;

  const planColumns = () => {
    const keys = dynamicColumnItems.value.map(item => item.key);

    dynamicColumns.value = columns
      .filter(item => state.checkedList.includes(item.dataIndex))
      .sort((a, b) => {
        const aKey = a.key || a.dataIndex;
        const bKey = b.key || b.dataIndex;
        return keys.indexOf(aKey) - keys.indexOf(bKey);
      })
      .map(item => item);
  };

  watch(
    () => state.checkedList,
    () => {
      state.checkAll =
        !!state.checkedList.length && state.checkedList.length === dynamicColumnValues.length;
      state.indeterminate =
        !!state.checkedList.length && state.checkedList.length < dynamicColumnValues.length;
      planColumns();
    },
    { deep: true },
  );

  watch(
    () => dynamicColumnItems,
    () => {
      planColumns();
    },
    { deep: true },
  );

  const handleColumnChange = (e: Event, column: DynamicColumnItem) => {
    const checked = (e.target as HTMLInputElement).checked;
    column.checked = checked;
    if (checked) {
      !state.checkedList.includes(column.key) && state.checkedList.push(column.key);
    } else {
      state.checkedList = state.checkedList.filter(item => item !== column.key);
    }
  };

  const handleColumnAllClick = (e: Event) => {
    const checked = (e.target as HTMLInputElement).checked;
    state.checkedList = checked ? dynamicColumnValues : [];
    dynamicColumnItems.value = dynamicColumnItems.value.map(column => {
      column.checked = checked;
      return column;
    });
  };

  const reset = () => {
    state.checkedList = dynamicColumnValues;
    dynamicColumnItems.value = columns.map(column => {
      return {
        key: column?.key || column.dataIndex,
        label: column.title,
        checked: checkAll,
      } as DynamicColumnItem;
    });
  };

  const move = (index: number, targetIndex: number) => {
    const newColumnItems = dynamicColumnItems.value;
    const columnItemKey = newColumnItems[index];
    newColumnItems.splice(index, 1);
    if (targetIndex === 0) {
      newColumnItems.unshift(columnItemKey);
    } else {
      newColumnItems.splice(targetIndex, 0, columnItemKey);
    }
    dynamicColumnItems.value = newColumnItems;
  };

  return {
    dynamicColumns,
    dynamicColumnItems,
    state,
    reset,
    handleColumnAllClick,
    handleColumnChange,
    move,
  };
};
