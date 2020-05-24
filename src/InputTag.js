// React Core
import React, { useState, useRef } from 'react';

// 3rd
import { Container, Row, Col, Badge } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';

const InputTag = (props) => {
  const tagInput = useRef(null)
  const [tags, setTags] = useState(props.values || [])
  const delimiters = [188, 13]

  function handleChange(event) {
    const { value } = event.target
    if (value.indexOf(',') !== -1) {
      addTag(value)
    }
  }

  function inputKeyDown(event) {
    const { keyCode, target: { value } } = event

    if (delimiters.includes(keyCode) && value) {
      addTag(value)
    } else if (event.key === 'Backspace' && !value) {
      removeTag(tags.length - 1);
    }
  }

  function addTag(value) {
    setTags(filterTags([...tags, ...value.split(',')]))
    tagInput.current.value = null
  }

  function filterTags(tagsInsert) {
    const filteredTag = tagsInsert.filter(tag => tag !== '')
    const noRepeatTags = filteredTag.filter((tag, i) => filteredTag.indexOf(tag) === i)

    return props.noRepeat ? noRepeatTags : filteredTag
  }

  function removeTag(tag) {
    const newTags = [...tags]
    newTags.splice(tag, 1)
    setTags(newTags)
  }

  return (
    <Container fluid='md'>
      <Row>
        <Col>
          <h1 className='text-center'>Input React Tags!</h1>
          <p className='text-center'>A simple react tag component</p>
        </Col>
      </Row>
      <Row>
        <Col>
          <div className='input-tags'>
            {tags && tags.map((tag, key) => (
              <div key={key}>
                <Badge variant='success' className='badge-tags'>
                  {tag}
                  <button type='button' onClick={() => { removeTag(key) }}>+</button>
                </Badge>
              </div>
            ))}
            <input
              type='text'
              onChange={handleChange}
              onKeyDown={inputKeyDown}
              ref={tagInput}
            />
          </div>
        </Col>
      </Row>
    </Container>
  )
}

export default InputTag
