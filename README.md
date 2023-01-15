## show full list data when get data
u can add this on inside app.js component
```
{
    datas.items?.map((item) => {
        return (
          <div>
            <img src={item.media.m} alt={item.media.m} />
            <h1>{item.title}</h1>
            <p>{item.tags}</p>
            <p>{item.description}</p>
          </div>
        );
    })
}
```
