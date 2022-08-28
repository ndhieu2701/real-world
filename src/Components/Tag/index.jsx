import React from "react";

const Tag = (props) => {
  const handleClick = (e) => {
    if(props.haveCloseIcon){
      props.setTagList((tagList) => {
       const tagRemove = tagList[props.id]
       return tagList.filter(tag => tag !== tagRemove)
      })
    }
    if(!props.haveCloseIcon){
      props.setFeedActive(`?&tag=${props.value}`)
      props.setTagActive(props.value)
      document.querySelector('.feed-label.active').classList.remove('active')
      const node = document.querySelectorAll('.feed-label')
      node[node.length - 1].classList.add('active')
    }
  };
  return (
    <span className="tag-default tag-pill" style={{cursor : "pointer"}} onClick={handleClick}>
      {props.haveCloseIcon && <i className="ion-close-round"></i>}
      {props.value}
    </span>
  );
};

export default Tag;
