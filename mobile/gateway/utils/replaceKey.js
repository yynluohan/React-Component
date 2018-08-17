export default function replaceKey(map){
  return function replaceData(data) {
    let rst = undefined;
    if( typeof(data) === 'string' ){
      rst = data;

      // Object.keys(map).forEach( key => rst = rst.replace(key, map[key]) );
    }else{
      if( data.length !== undefined ){
        [ ...rst ] = data;

        rst.forEach( (item,i) => rst[i] = replaceData(item) );
      }else{
        ;
        ({ ...rst } = data);

        Object.keys(rst).forEach( key => {
          if( typeof(rst[key]) === 'object' && rst[key].length !== undefined ){
            rst[key] = replaceData(rst[key]);
          }
          if( map[key] !== undefined ){
            rst[ map[key] ] = rst[key];
            delete rst[key];
          }
        });
      }
    }
    return rst;
  }
}
