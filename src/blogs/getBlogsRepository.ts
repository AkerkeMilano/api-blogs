import { blogCollection } from "../db/mongo-db"

export const getBlogsRepository = {
    mapToOutput(blog: any) {
        const mappedBlog = {
            id: blog._id,
            name: blog.name,
            description: blog.description,
            isMembership: blog.isMembership,
            websiteUrl: blog.websiteUrl,
            createdAt: blog.createdAt
    }
    return mappedBlog
    },
    async getAllBlogs(query: any) {
        const search = query.searchNameTerm
            ? {name: {$regex: query.searchNameTerm, $options: 'i'}}
            : {}

        const filter = {
            ...search
        }
        const totalCount = await blogCollection.countDocuments(filter)
        
        const blogsArr = await blogCollection
                .find(filter)
                .sort(query.sortBy, query.sortDirection)
                .skip((query.pageNumber - 1) * query.pageSize)
                .limit(query.pageSize)
                .toArray() as any[]
        return {
                    pagesCount: Math.ceil(totalCount / query.pageSize),
                    page: query.pageNumber,
                    pageSize: query.pageSize,
                    totalCount,
                    items: blogsArr.map(this.mapToOutput)
                }
    }
}