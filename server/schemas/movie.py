#this used convert mongo db object into python dict
def movieEntity(item) -> dict:
    return {
        "id":str(item['_id']),
        "title":item['title'],
        "movie":item['movie'],
        "genres":item['genres'],
        "year":item['year'],
        "Rating":item['Rating'],
        "RottenTomato":item['RottenTomato'],
    }


def moviesEntity(items)-> list:
    return [movieEntity(item) for item in items]
