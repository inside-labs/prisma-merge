import {Command, flags} from '@oclif/command'
import {merge} from "./prisma-merge";

class PrismaMerge extends Command {
  static description = 'Merge all *.prisma files into one'

  static flags = {
    version: flags.version({char: 'v'}),
    help: flags.help({char: 'h'}),
    baseFile: flags.string({description: 'Base file usually with datasource & generator statement', char: 'b', default: 'src/prisma/base.prisma'}),
    schemaFilePatterns: flags.string({description: 'Glob to all prisma files to include', char: 's', default: 'src/**/*.prisma'}),
    outputFile: flags.string({description: 'Output file', char: 'o', default: 'src/prisma/schema.prisma'}),
    excludedFilePattern: flags.string({description: 'Comma separated glob patterns for excluded files (e.g schema.prisma in migrations / generated folder)', char: 'e', default: 'src/**/schema.prisma'})

  }

  async run() {
    const { flags} = this.parse(PrismaMerge)
    this.log(JSON.stringify(flags))
    this.log('Merging prisma files')
    await merge(flags.baseFile, flags.schemaFilePatterns, flags.outputFile, flags.excludedFilePattern)
    this.log('Done')
  }
}

export = PrismaMerge