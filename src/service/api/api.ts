import { HttpClient } from "./http-client"

const apiUrl = "https://api.bscscan.com"
if (!apiUrl) {
  throw new Error("API URL env must be set!")
}

export class Api extends HttpClient {
  public constructor() {
    super(apiUrl as string)
  }

  public getBalance = (user: string) => {
    return this.instance.get<any[]>(
      `/api?module=account&action=tokenbalance&contractaddress=0xe9e7CEA3DedcA5984780Bafc599bD69ADd087D56&address=${user}&tag=latest&apikey=Z9T7GVUPQ9S8K4TY79R52YUUE54AAUA1H5`,
    )
  }
  public fetch() {
    return this.instance.get("")
  }
}

const api = new Api()

export { api }
