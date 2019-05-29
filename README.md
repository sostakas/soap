
docker-compose up

wsdl: {url}/wsdlfile

**all courses**
```
<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/">
   <soapenv:Header/>
   <soapenv:Body>
   	<CoursesRequest></CoursesRequest>
   </soapenv:Body>
</soapenv:Envelope>
```
**all students**
```
<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/">
   <soapenv:Header/>
   <soapenv:Body>
   	<StudentsGetRequest></StudentsGetRequest>
   </soapenv:Body>
</soapenv:Envelope>
```

**add course to student**
```
<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/">
   <soapenv:Header/>
   <soapenv:Body>
   	<CoursesAddRequest>
         <courseId>0</courseId>
         <studentId>1</studentId>
      </CoursesAddRequest>
   </soapenv:Body>
</soapenv:Envelope>
```

***add course**
```

```