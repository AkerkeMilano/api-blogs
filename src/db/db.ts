import {InputVideoType, Resolutions} from './video-db-type'
 
export type DBType = {
    videos: InputVideoType[] // VideoDBType[]
    // some: any[]
}



const video1: InputVideoType = {
    id: Math.floor(Date.now() + Math.random()*10),
    title: 't' + Date.now() + Math.random(),
    author: 'a' + Date.now() + Math.random(),
    canBeDownloaded: true,
    minAgeRestriction: null,
    createdAt: new Date().toISOString(),
    publicationDate: new Date((new Date().setDate(new Date().getDate() + 1))).toISOString(),
    availableResolutions: [Resolutions.P240],
}

const video2: InputVideoType = {
    id: Math.floor(Date.now() + Math.random()*10),
    title: 't' + Date.now() + Math.random(),
    author: 'a' + Date.now() + Math.random(),
    canBeDownloaded: true,
    minAgeRestriction: null,
    createdAt: new Date().toISOString(),
    publicationDate: new Date((new Date().setDate(new Date().getDate() + 1))).toISOString(),
    availableResolutions: [Resolutions.P480],
}
 
// ...
 
export const db: DBType = {
    videos: [video1, video2],
    // some: []
}
 
export const setDB = (dataset?: Partial<DBType>) => {
    if (!dataset) {
        db.videos = []
        // db.some = []
        return
    }
 
    db.videos = dataset.videos || db.videos
    // db.some = dataset.some || db.some
}