module.exports = {
    Query: {
      launches: (_, __, { dataSources }) =>
        dataSources.launchAPI.getAllLaunches(),
      launch: (_, { id }, { dataSources }) =>
        dataSources.launchAPI.getLaunchById({ launchId: id }),
      me: (_, __, { dataSources }) => dataSources.userAPI.findOrCreateUser()
    }
  };


// fieldName: (parent, args, context, info) => data;
// parent: 親 resolver から受け取ったオブジェクト。
// args: この field に対して渡された引数。
// context: GraphQL operation の resolver 全体で共有されるオブジェクト。このチュートリアルでは認証情報やデータソースを context で共有している。
// info: 実行したオペレーションに関する状態等の詳細情報。通常は用いられないがよりアドバンスなケースにおいて使われることが多い。