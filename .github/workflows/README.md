```text
Branches pipeline / flow

defect/<name> ----+
                  |
feature/<name>  --+-->  dev  ----->  ci  ----->  main  ----->  (Deployment)
   ^                     ^            ^            ^
   |                     |            |            |
   |                     |            |            |
Local Development        |            |            |
& Experimentation        |            |            |
                         |            |            |
                   Pull Requests      |            |
                   from forks         |            |
                                      |            |
                                Comprehensive      |
                                Testing and        |
                                Integration        |
                                                   |
                                               Production
```
