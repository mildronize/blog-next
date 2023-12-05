import { defineDocumentType, makeSource } from 'contentlayer/source-files'
import { extractDate } from './libs/content-service/pathUtility'

export const Post = defineDocumentType(() => ({
  name: 'Post',
  filePathPattern: `**/*.md`,
  fields: {
    title: { type: 'string', required: true },
    // date: { type: 'date', required: true },
  },
  computedFields: {
    url: { type: 'string', resolve: (post) => `/posts/${post._raw.flattenedPath}` },
    date: { type: 'date', resolve: (post) => extractDate(post._raw.flattenedPath) },
  },
}))

export default makeSource({ contentDirPath: 'contents/posts', documentTypes: [Post] })
