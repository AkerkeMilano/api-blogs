import {InputVideoType} from '../src/db/video-db-type'
// import {Resolutions} from '../src/input-output-types/video-types'
import {DBType} from '../src/db/db'

export enum Resolutions {
    P144 = "P144",
    P240 = "P240",
    P360 = "P360",
    P480 = "P480",
    P720 = "P720",
    P1080 = "P1080",
    P1440 = "P1440",
    P2160  = "P2160"
}

export const video1: InputVideoType = {
    id: 655,
    title: 't' + Date.now() + Math.random(),
    author: 'a' + Date.now() + Math.random(),
    canBeDownloaded: true,
    minAgeRestriction: null,
    createdAt: new Date().toISOString(),
    publicationDate: new Date((new Date().setDate(new Date().getDate() + 1))).toISOString(),
    availableResolutions: [Resolutions.P240],
}
 
// ...
 
export const dataset1: DBType = {
    videos: [video1],
}
 
// ...