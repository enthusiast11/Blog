 export interface IPost {
   header: string
   hashteg: string
   main: string
   postKey: string
   image?: File
   imageUrl?: string 
 }
  export interface  IPosts extends IPost {
   posts: IPost[]
   header: string
   hashteg: string
   main: string
   
   postKey: string
   image?: File
   imageURL?: string | ArrayBuffer | null
 }


 export interface IComment {
  value: string,
  data: string,
  name: string
 }