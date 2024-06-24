export type Root = Root2[]

export interface Root2 {
  id: number
  status: string
  georgianHeadword: string
  englishHeadword: string
  functionalLabel: string
  stylisticQualification: string
  georgianDefinition: string
  englishDefinition: string
  georgianIllustrationSentence: string
  englishIllustrationSentence: string
  source: string
  idiom: string
  synonym: string
  usageNote: string
  imageUrl: string
  subTopic: SubTopic
}

export interface SubTopic {
  id: number
  status: string
  georgianName: string
  englishName: string
  topic: Topic
  entries: string[]
}
export type Roles = string[]
export type users = user[]
export interface addUser {
    email: string
    password: string
    role: string
  }
  export interface LoginToken {
    tokenType: string
    accessToken: string
    expiresIn: number
    refreshToken: string
  }
export interface user{
  id: string
  email: string
  status: string
  role: string
  isAdmin: boolean
  isSuperAdmin: boolean
  isViewer: boolean
}
export type Topics = Topic[]
export interface Topic {
  id: number
  status: string
  georgianName: string
  englishName: string
  subTopics: string[]
}
export interface Entry {
    id: number
    status: string
    georgianHeadword: string
    englishHeadword: string
    functionalLabel: string
    stylisticQualification: string
    georgianDefinition: string
    englishDefinition: string
    georgianIllustrationSentence: string
    englishIllustrationSentence: string
    source: string
    idiom: string
    synonym: string
    usageNote: string
    imageUrl: string
    subTopic: string
  }