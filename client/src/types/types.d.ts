export interface ITag {
    tag: string,
    blogsCount: number,
    followers: number
}

export interface IComment {
    content: string,
    userId: string,
    date: Date
}

export interface IUser {
    username: string,
}

export interface IBlog {
    _id: string,
    title: string,
    author: IUser,
    content: string,
    comments: [IComment],
    published: boolean,
    public: boolean,
    image: string,
    tags: [ITag],
    date: Date,
    lastUpdated: Date,
}