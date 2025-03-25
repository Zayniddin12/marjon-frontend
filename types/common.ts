type TClass =
  | string
  | string[]
  | Record<string, boolean>
  | Record<string, boolean>[]

export type TClassName = TClass | TClass[]

export interface IDefaultResponse<T = any> {
  next: string
  previous: string
  results: T[]
}

export type THeaderVariants = 'default' | 'dark'

export interface IActivity {
  id: number
  title: string
}

export interface INews {
  slug: string
  title: string
  cover_image: string
  created_at: string
}

export interface IAboutAdvantage {
  title: string
  description: string
  icon: string
}

export interface IStatistics {
  description: string
  value: string
}

export interface IFeedback {
  full_name: string
  avatar: string
  feedback: string
}

export interface IDeal {
  id: number
  ordering: number
  start_date: string
  end_date: string
  status: 'inprogress' | 'rejected' | 'finished' | 'pending'
  order_cars: {
    id: number
    type: {
      id: number
      title: string
      slug: string
      image: string
    }
    sides: {
      id: number
      title: string
    }[]
    count: number
  }[]
  locations: {
    id: number
    title: string
  }[]
  total_amount: string
  paid_amount: number
  debt_amount: number
}

export interface IReport {
  id: number
  location1: string
  location2: string
  photo_reports: []
  car: {
    id: 3
    number_type: string
    state_number: string
    car_model: string
    car_mark_logo: string
  }
}

export interface ITransaction {
  id: number
  contract: number
  order: {
    id: number
    ordering: number
  }
  amount: string
  date: string
  is_bonus: boolean
}

export interface IVehicle {
  id: number
  title: string
  slug: string
  image: string
  ordering: number
  static_type_images: []
  description: null
  type_sides: {
    id: number
    type: number
    side: {
      id: number
      title: string
    }
    image: string
  }[]
}

export interface ICar {
  type: string
  count: number
  amount: number
  total_amount: number
  side: string[]
  items: [
    {
      region: string
      count: string
    }
  ]
}

export interface ICalculation {
  cars: ICar[]
  total_amount: number
  start_date: string
  end_date: string
  regions: {
    id: number
    title: string
    soato: string
  }[]
  discount: null | number
  discount_price: null | number
  proposal: null | number
}
