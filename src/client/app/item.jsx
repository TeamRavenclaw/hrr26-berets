var Item = (props) => (
  <div className="popular-item">
      <div className="item-title">
        {props.product.name}
      </div>
      <div onClick={props.onClick}>
        <img src={props.product.thumbnailImage} alt=""/>
      </div>
      <div className="item-price">
        {props.product.salePrice}
      </div>
  </div>
  )

//box image = props.product.thumbnailImage
//box name = props.product.name
//box price = props.product.salePrice
//do we want an additional 'add to list onClick function?'
export default Item;