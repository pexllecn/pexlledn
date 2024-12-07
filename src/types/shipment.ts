export interface Stop {
  city: string
  state: string
  zip: string
  address: string
  dateTime: string
}

export interface ShipmentCard {
  loadId: string
  status: 'Delivery' | 'Transfer' | 'Pick Up'
  stops: {
    from: Stop
    to: Stop
  }
}

export interface Driver {
  name: string
  avatar: string
}

export interface Customer {
  name: string
  avatar: string
}

export interface Equipment {
  truckNumber: string
}

export interface Pricing {
  loadPrice: number
}

