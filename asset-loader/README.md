## B3 scanner

> Script for scanning CVM company files and reports

Fetch company details
```
    make activate
    b3scan summary
```

Fetch report data
```
    make report
```

Post data to remote url
```
    make -o http://localhost:8080 summary
```

For help
```
    b3scan --help
    b3scan --info
```
