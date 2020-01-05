export default class ItemsAdapter {

    prepareResponse(items: any[]) {
        return items.map(item => {
            return {
                id: item._id,
                status: item.status,
                description: item.description,
                createdOn: item._kmd.ect,
                modifiedOn: item._kmd.lmt
            };
        })
    }
}
