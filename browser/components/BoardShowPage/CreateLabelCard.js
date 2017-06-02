import React, {Component} from 'react'
import Icon from '../Icon'
import $ from 'jquery'
import Form from '../Form'
import Button from '../Button'
import DialogBox from '../DialogBox'
import './CardModal.sass'


export default class CreateLabelCard extends Component {
  constructor(props){
    super(props)
    this.state = {
      boards: null, // loads via ajax upon mount
      boardId: this.props.board.id,
      listId: this.props.card.list_id,
      title: this.props.card.content,
      order: this.props.card.order,
      color: null,
    }
    this.createLabelHandler = this.createLabelHandler.bind(this)
    this.selectColor= this.selectColor.bind(this)
  }


  createLabelHandler(event){
    event.preventDefault()
    const newLabel = {
      board_id: this.state.boardId,
      description: this.refs.description.value,
      color: this.state.color
    }
    $.ajax({
      method: 'post',
      url: `/api/boards/${this.state.boardId}/labels` ,
      contentType: "application/json; charset=utf-8",
      dataType: 'json',
      data: JSON.stringify(newLabel)
    })
    .then(response => {
      console.log( "=-=-=-> response", response )
    })
    .catch( (error) => {
      console.log( "=-=-=-> error", error )
        debugger
    })
  }

  selectColor(color){
    this.setState({color})
  }


  render(){
    const colorBoxes = colors.map(color =>{
      return <ColorBox
        key={color}
        color={color}
        onClick={this.selectColor}
        selected={color === this.state.color}
      />
    })

    return <DialogBox className="CardModal-CopyCardDialog" heading='Edit Label' onClose={this.props.onClose}>
      <Form onSubmit={this.createLabelHandler}>
        <input type="text" ref='description'/>
        <div className='CardModal-LabelCard-container'>
          {colorBoxes}
        </div>
        <Button type="primary" submit>Create Label</Button>
      </Form>
    </DialogBox>
  }
}

const colors = [
  "#0079bf",
  "#d8a359",
  "#70a95d",
  "#bc6858",
  "#9d7cae",
  "#d478a4",
  "#6cc885",
  "#30bbd3",
  "#98a0a4"
]

const ColorBox = (props) => {
  const {color} = props
  return <button
    style={{backgroundColor: color}}
    className="CardModal-LabelCard-box"
    onClick={event => { event.preventDefault(); props.onClick(color) }}
  >
    {props.selected ? <Icon type="check" /> : null }
  </button>
}
