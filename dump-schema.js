#!/usr/bin/env node

const fs = require('fs')
const path = require('path')
const { printSchema } = require('graphql')
const { loadSchemaSync, CodeFileLoader, GraphQLFileLoader } = require('graphql-tools')

const packagesRoot = path.join(__dirname)

const sourcePackages = [
  'users', 'github', 
]

const sources = [
  path.join(__dirname, 'federation.graphql'),
  path.join(__dirname, 'common.ts'),
  ...sourcePackages.map(p => path.join(packagesRoot, p, 'schema.ts')),
]

const OUT_DIR = 'gen'

const schemas = loadSchemaSync(sources, { loaders: [new CodeFileLoader(), new GraphQLFileLoader()] })

// if (!fs.existsSync(OUT_DIR)) fs.mkdirSync(OUT_DIR)
// fs.writeFileSync(
//   'gen/schema.graphql',
//   `# DUMPED GRAPHQL SCHEMA\n${printSchema(schema)}`
// )
