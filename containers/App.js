import React, {Component} from 'react';

let hoverStyle = {}
let appStyle = {}
let tooltipStyle = {}
const MouseOverClickHover = ({info, description, clickValues}) => {
	// console.log(description, clickValues)
	return (
    <div style={{ minWidth: '160px'}}>
      <a style={hoverStyle}
				onMouseEnter={()=>info.onMouseEnter()}
				onMouseLeave={()=>info.onMouseLeave()}
				onClick={()=>info.onClick(clickValues)}
			>
				{description}
      </a>
      { info.state.wasClicked || info.state.hover ? <div style={tooltipStyle}>Hi There!!! I have been hovered :</div> : <div /> }
    </div>
  )
}

const NumericHover = ({info, description, hoverVal}) => {
	// console.log(description, clickValues)
	return (
    <div style={{ minWidth: '160px'}}>
      <a style={hoverStyle}
				onMouseEnter={()=>info.onMouseMany(hoverVal)}
				onMouseLeave={()=>info.onMouseLeave()}
			>
				{description}
      </a>
      { info.state.hoverVal > hoverVal-1 ? <div style={tooltipStyle}>Hi There!!! I have been hovered :</div> : <div /> }
    </div>
  )
}

export default class App extends Component {

  constructor (props) {
    super (props);
    this.state = {
      hover: false,
      wasClicked: false,
			hoverVal:0
    }
  }

  onMouseEnter = (e) => {
    this.setState({
      hover: true
    })
  }
	onMouseMany = (hoverVal) => {
		// console.log(hoverVal);
		this.setState({
			hoverVal: hoverVal
		})
	}

  onMouseLeave = (e) => {
    this.setState({
      hover: false,
			hoverVal:0
    })
  }

  onClick = (clickValues) => {
		// console.log(clickValues)
    this.setState({
      hover: !clickValues.hover,
      wasClicked: !clickValues.wasClicked
    })
  }

	set = (val) => {
		return !val
	}

  render () {
    appStyle = {
      textAlign: 'center',
      lineHeight: '50px',
      display: 'flex',
      justifyContent: 'space-around',
      minHeight: '220px'
    }
    if (this.state.wasClicked || this.state.hover || this.state.hoverVal > 0) {
      hoverStyle = {
        backgroundColor: 'blue',
        color: 'white'
      }
      tooltipStyle = {
        boxShadow: '3px 2px 3px 3px green',
        width: '150px',
        margin: '30px auto',
        borderRadius: '3px',
        backgroundColor: 'grey'
      }
    } else {
      hoverStyle = {
        backgroundColor: 'white'
      }
      tooltipStyle = {
        boxShadow: '1px 1px 1px white',
        width: '150px',
        margin: '30px auto',
        borderRadius: '3px'
      }
    }
    return (
      <div style={{textAlign:'center'}}>
        <h3 >Tool Tip App</h3>
        <div style={appStyle}>
          <MouseOverClickHover info={this} description={'Normal Hover Me'							 } clickValues={{hover:this.set(true)  , wasClicked:this.set(false)}}/>
					<MouseOverClickHover info={this} description={'Persistent Hover Click(OFF/ON)'} clickValues={{hover:this.state.hover, wasClicked:this.set(false)}}/>
					<MouseOverClickHover info={this} description={'Persistent Hover Click(ON/OFF)'} clickValues={{hover:this.set(false) , wasClicked:this.state.wasClicked}}/>
        </div>
				<div style={appStyle}>
					< NumericHover info={this} description={'Hover ONE'							 		 } hoverVal={1} />
					< NumericHover info={this} description={'Hover ONE and TWO'					 } hoverVal={2} />
					< NumericHover info={this} description={'Hover ONE and TWO and THREE'} hoverVal={3} />
				</div>
      </div>
    )
  }
}
