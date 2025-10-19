import product from './product'
import category from './category'
import order from './order'
import customer from './customer'
import siteSettings from './siteSettings'
import promotion from './promotion'
import blogPost from './blogPost'
import review from './review'
import pageContent from './pageContent'
import customDesignRequest from './customDesignRequest'

export const schemaTypes = [
  // E-commerce
  product,
  category,
  order,
  customer,
  review,
  customDesignRequest,
  
  // Marketing
  promotion,
  blogPost,
  
  // Content
  pageContent,
  
  // Settings
  siteSettings,
]
