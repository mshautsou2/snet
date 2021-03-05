# Development
# Code style and project organization
1. Follow this project structure
```bash
- root
   | - config
   | - errors/exceptions
   | - modules
        | - resource1
               | - dtos #(or don't use dtos at all)
                    |-create.dto.ts 
                    |-update.dto.ts
               | - resource1.service.ts
               | - resource1.controller.ts
               | - resource1.repository.ts

        | - resource2
```
2. Always use singular nouns
3. Return null only if method has xxxOrNull affix
4. ? use dtos
5. ? where place seeds
6. ? where place migrations
7. ? should we use migrations
8. ? how to store all configs in one pace
9. ? where to put tests