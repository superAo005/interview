


function createAction(type,prepareAction){
    function actionCreator(args){
        if(prepareAction){
            let prepared = prepareAction(args);
            return {
                type,
                ...prepared
            }
        }
        return {
            type,
            payload:args
        }
    }
    actionCreator.type = type;
    return actionCreator;
}
export default createAction;