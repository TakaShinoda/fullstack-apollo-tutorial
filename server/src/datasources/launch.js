const { RESTDataSource } = require('apollo-datasource-rest')

class LaunchAPI extends RESTDataSource {
  constructor() {
    super()
    this.baseURL = 'https://api.spacexdata.com/v2/'
  }

  launchReducer(launch) {
    return {
      id: launch.flight_number || 0,
      cursor: `${launch.launch_date_unix}`,
      site: launch.launch_site && launch.launch_site.site_name,
      mission: {
        name: launch.mission_name,
        missionPatchSmall: launch.links.mission_patch_small,
        missionPatchLarge: launch.links.mission_patch,
      },
      rocket: {
        id: launch.rocket.rocket_id,
        name: launch.rocket.rocket_name,
        type: launch.rocket.rocket_type,
      },
    }
  }

  async getAllLaunches() {
    // this.get('launches') を実行すると GET request を https://api.spacexdata.com/v2/launches に対して行う
    // this.launchReducer を使って必要な形状に変換
    const response = await this.get('launches')
    return Array.isArray(response)
      ? response.map((launch) => this.launchReducer(launch))
      : []
  }

  async getLaunchById({ launchId }) {
    // 単一のフライト番号を引数として受け取り特定の単一の発射予定を返すメソッド
    const response = await this.get('launches', { flight_number: launchId })
    return this.launchReducer(response[0])
  }

  //launchID を複数受け取って、複数の発射予定を返すメソッドです。
  getLaunchesByIds({ launchIds }) {
    return Promise.all(
      launchIds.map((launchId) => this.getLaunchById({ launchId }))
    )
  }
}

module.exports = LaunchAPI
