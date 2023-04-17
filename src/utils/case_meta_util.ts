/**
 * 将元数据 集合转化成 map结构, 方便调用
 * @param result
 */
function build_meta_map(result:any[]){
  let map:any = {};
  let i ;
  for(i in result){
    let metaList = result[i]?.metaList;
    let j;
    for(j in metaList){
      let meta = metaList[j];
      map[meta.filed] = meta;
    }
  }
  return map;
}

/**
 * 将多选的值, 转化成数组
 * @param case_data_info
 * @param mete_list
 */
export  function convert_case_data(case_data_info:any[], mete_list:any[]){
  /*对多选值进行转化成数组*/
  let meta_map = build_meta_map(mete_list);
  let meta_filed;
  for(meta_filed in case_data_info){
    if(meta_filed.startsWith('form_') || meta_filed.startsWith('tag_') ){
      let meta_info = meta_map[meta_filed];
      if(meta_info){
        let data_type = meta_info.dataType;
        /*对于多选的值, 进行处理*/
        if([5, 6, 13, 14, 15, 16, 17, 9].indexOf(data_type) > -1){
          let meta_value = case_data_info[meta_filed];
          if(meta_value && meta_value.length > 0){
            case_data_info[meta_filed] = meta_value.split(',');
          }
        }
      }
    }
  }

  return case_data_info;
}