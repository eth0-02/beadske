import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './schemaTypes'

export default defineConfig({
  name: 'default',
  title: 'NotYasho Blog',

  projectId: 'wrmf59p3',
  dataset: 'production',
  
  basePath: '/',

  plugins: [structureTool(), visionTool()],

  schema: {
    types: schemaTypes,
  },
})
