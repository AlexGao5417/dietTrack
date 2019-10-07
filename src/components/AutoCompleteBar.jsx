import { Icon, Input, AutoComplete } from 'antd';
import React, { useState, useContext } from 'react'
import axios from '../axios'
import ItemModal from './ItemModal'
import { Context } from '../dataContext/Context'
import * as actions from '../dataContext/actions'
import styled from 'styled-components'


const { Option, OptGroup } = AutoComplete;

const dataSource_test = [
  {
    title: 'Branded',
    children: [
      {
        title: 'TimTam',
        count: 10,
      },
      {
        title: 'KEF Cheese Burger',
        count: 10,
      },
    ],
  },
  {
    title: 'Common',
    children: [
      {
        title: 'Apple',
        count: 10,
      },
    ],
  },
];

const options = dataSource_test
  .map(group => (
    <OptGroup key={group.title} >
      {group.children.map(opt => (
        <Option key={opt.title} value={opt.title}>
          {opt.title}
        </Option>
      ))}
    </OptGroup>
  ))
  .concat([
    <Option disabled key="all" className="show-all">
      <a href="/" target="_blank" rel="noopener noreferrer">
        View all results
      </a>
    </Option>,
  ]);

const prefixstyle = {
  width: '17.5px',
  height: '17.5px',
}

const option_style = {
  width: '420px',
  height: '72px',
  display: 'flex',
  alignItems: 'center'
}

const font_style = {
  marginLeft: '16px',
  height: '24px',
  fontFamily: 'Roboto',
  fontSize: '16px',
  fontWeight: '500',
  fontStyle: 'normal',
  fontStretch: 'normal',
  lineHeight: '1.5',
  letterSpacing: '0.15px',
  color: 'rgba(0, 0, 0, 0.87)'
}

const font_style2 = {
  marginLeft: '16px',
  height: '20px',
  fontFamily: 'Roboto',
  fontSize: '14px',
  fontWeight: 'normal',
  fontStyle: 'normal',
  fontStretch: 'normal',
  lineHeight: '1.43',
  letterSpacing: '0.25px',
  color: 'rgba(0, 0, 0, 0.6)'
}

const Wrapper = styled.div`
width: 40%;
height: 48px;
margin: 8px auto;
fontSize: 16px;
  @media (max-width: 800px){
    width: 90%;
  }
`


const AutoCompleteBar = () => {

  const { state, dispatch }= useContext(Context)
  const [dataSource, setDataSource] = useState(options)
  const [detailInfo, setdetailInfo] = useState(null)
  
  const getDataSource = (query) => {
    if (query) {
      const urlQuery = `search/instant?query=${query}`
      axios.get(urlQuery).then((res) => {
        const data =
          (
            [<OptGroup key='common'>
              {res.data.common.map(opt => (
                <Option
                  key={opt.food_name}
                  value={opt.food_name}
                  style={option_style}>
                  <img src={opt.photo.thumb} style={{ width: '40px', height: '40px' }} />
                  <div style={font_style}>
                    {opt.food_name}
                  </div>
                </Option>
              ))}
            </OptGroup>,
            <OptGroup key='branded'>
              {res.data.branded.map(opt => (
                <Option
                  key={opt.nix_item_id}
                  value={opt.nix_item_id}
                  style={option_style}>
                  <img src={opt.photo.thumb} style={{ width: '40px', height: '40px' }} />
                  <div style={{display:'flex', flexDirection:'column'}}>
                  <div style={font_style}>
                    {opt.food_name}
                  </div>
                  <div style={font_style2}>
                    {opt.brand_name}
                  </div>
                  </div>
                </Option>
              ))}
            </OptGroup>,
            <Option disabled key="all" className="show-all">
              <a href="/" target="_blank" rel="noopener noreferrer">
                View all results
          </a>
            </Option>]
          )
        setDataSource(data)
      })
    }
  }

  const handleClick = (value) => {
    const isCommon = value.length < 20    
    setdetailInfo(value);
    dispatch(actions.foodQuery(value, isCommon))
    dispatch(actions.openModal());
  }

  return (
    <Wrapper>
      <AutoComplete
        dropdownMenuStyle={{ maxHeight: '600px' }}
        className="certain-category-search"
        dropdownClassName="certain-category-search-dropdown"
        dropdownMatchSelectWidth={false}
        size="large"
        style={{ width: '100%' }}
        dataSource={dataSource}
        optionLabelProp="value"
        onSelect={(value)=>handleClick(value)}
        onSearch={(value) => { getDataSource(value) }}
        // later use global variale to control it! onSelect={(value)=>{setModalvisible(!modalvisible)}}
      >
        <Input
          placeholder="  Search foods..."
          prefix={<Icon style={prefixstyle}
            type="search"
            className="certain-category-icon"
          />}
        />
      </AutoComplete>
      <ItemModal query={detailInfo}/>
    </Wrapper>
  );
}

export default AutoCompleteBar