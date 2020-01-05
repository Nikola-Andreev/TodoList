export default class ListsAdapter {

    prepareResponse(lists: any[]) {
        return lists.map(list => {
            return {
                id: list._id,
                title: list.title,
                createdOn: list._kmd.ect,
                modifiedOn: list._kmd.lmt
            };
        })
    }
}
