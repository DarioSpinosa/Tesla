export type CarModel = {
  code: string
  colors: CarColor[]
  description: string
}

export type CarColor = {
  code: string
  description: string
  price: number
}

export type CarOptions = {
  configs: CarConfig[]
  towHitch: boolean
  yoke: boolean
}

export type CarConfig = {
  description: string
  id: number
  price: number
  range: number
  speed: number
}

export type CarSelectedOptions = {
  config: CarConfig
  towHitch?: boolean
  yoke?: boolean
}