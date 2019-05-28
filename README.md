
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

**add course to student**
```
<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/">
   <soapenv:Header/>
   <soapenv:Body>
   	<CoursesBuyRequest>
         <courseId>0</courseId>
         <studentId>1</studentId>
      </CoursesBuyRequest>
   </soapenv:Body>
</soapenv:Envelope>
```