/** 表单验证器类型 */
export interface Validator {
  /** 是否要求必填，默认必跳 */
  required?: true;
  /** 提示信息 */
  message?: string;
  /** 正则表达式 */
  pattern?: RegExp;
  /** 自定义验证方法 */
  validator?: (rule: any, value: string) => Promise<void>;
}

/** 表单验证规则辅助类（如果要国际化，可以参照sideMenu那个） */
export default class FormValidRule {
  /** 通用非空验证 */
  static commonValidate(text: string): Validator[] {
    return [{ required: true, message: `请输入${text}` }];
  }

  static validateUserId(): Validator[] {
    return [
      { required: true, message: `请输入账号` },
      { pattern: /^[a-zA-Z0-9]{6,20}$/, message: "账号只能是6-20位数字或字母" },
    ];
  }

  /** 登录用户名表单验证 */
  static validUserNameOfLogin(): Validator[] {
    return FormValidRule.commonValidate("请输入您要登录的用户名!");
  }

  /** 注册用户名表单验证 */
  static validUserNameOfRegist(): Validator[] {
    return [
      {
        required: true,
        validator: FormValidRule.validUserName,
      },
    ];
  }

  /** 注册账号表单自定义验证,注意第一个参数必须带上，否则回调执行时拿到的value会是rule的值*/
  static validUserName(_: any, value: string): Promise<void> {
    let regExp1 = /^([A-Za-z0-9])+@+([A-Za-z0-9])+.+([A-Za-z]{2,4})$/;
    let regExp2 = /^[a-zA-Z0-9]{2,20}$/;
    if (!value) {
      return Promise.reject("请输入您要注册的用户名！");
    }
    if (
      value.length >= 2 &&
      value.length <= 20 &&
      (regExp1.test(value) || regExp2.test(value))
    ) {
      /** 新版antd4.x，callback已经废弃，这里请使用promise来替代*/
      return Promise.resolve();
    } else {
      return Promise.reject("用户名是2-20位的数字或字母或邮箱！");
    }
  }

  /** 验证密码 */
  static validateUserPsw(): Validator[] {
    return [
      { required: true, message: `Please input your passoword!` },
      {
        pattern: /^(?![\d]+$)(?![a-zA-Z]+$)(?![^\da-zA-Z]+$).{8,20}$/,
        message: "密码需是长度为8-20位的数字字母或特殊字符。",
      },
    ];
  }

  static validatePsw() {
    return [
      {
        pattern: /^(?![\d]+$)(?![a-zA-Z]+$)(?![^\da-zA-Z]+$).{8,20}$/,
        message: "密码需是长度为8-20位的数字字母或特殊字符。",
      },
    ];
  }

  /** 验证确认密码 */
  static validateUserConfirmPsw() {
    return [
      {
        required: true,
        message: "请再次输入密码",
      },
      {
        pattern: /^(?![\d]+$)(?![a-zA-Z]+$)(?![^\da-zA-Z]+$).{8,20}$/,
        message: "密码需是长度为8-20位的数字字母或特殊字符。",
      },
      ({ getFieldValue }: any) => ({
        validator(_: any, value: any) {
          if (!value || getFieldValue("password") === value) {
            return Promise.resolve();
          }
          return Promise.reject(new Error("两次输入的密码不一致"));
        },
      }),
    ];
  }

  /** 验证手机号 */
  static validatePhone(): Validator[] {
    return [
      { required: true, message: `请输入手机号` },
      { pattern: /^1[3456789]\d{9}$/, message: `请填写正确的手机号码格式` },
    ];
  }

  /** 验证银行卡号 */
  static validateBank(): Validator[] {
    return [
      { required: true, message: `请输入银行卡号` },
      {
        pattern: /^([1-9]{1})(\d{15}|\d{18})$/,
        message: `请填写正确的银行卡号格式`,
      },
    ];
  }

  /**只能输入数字 */
  static ValidateNumber(): Validator[] {
    return [
      { required: true, message: `请输入` },
      {
        pattern:
          /(^[1-9]([0-9]+)?(\.[0-9]{1,2})?$)|(^(0){1}$)|(^[0-9]\.[0-9]([0-9])?$)/,
        message: `只能输入数字`,
      },
    ];
  }
}
