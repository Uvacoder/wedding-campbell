import React, {useState, useEffect} from 'react'
import { useForm, Controller } from 'react-hook-form'
import id from "uuid/dist/v1";
import { Input, Form, Label, Button, Row, Col } from 'reactstrap'
import { navigate } from 'gatsby'
import { ElementText } from './typography';
import _ from 'lodash'


function RsvpForm() {
 

  const [indexes, setIndexes] = useState([]);
  const [counter, setCounter] = useState(0);

  const onSubmit = (data) => console.log(data)

  const [data, setData] = useState([]);
  const { watch, handleSubmit, control, getValues } = useForm();
  watch("at", 2);

  const append = () => {
    const values = getValues();
    console.log(values);
    setData([...data, { id: id() }]);
  };

  const remove = (index) => {
    let temp = data;
    console.log(temp)
    setData([...temp.slice(0, index), ...temp.slice(index+1)]);
  };

  useEffect(() => {
    if (data.length === 0) {
      append()
    }
  })

   const addFriend = () => {
     setIndexes((prevIndexes) => [...prevIndexes, counter]);
     setCounter((prevCounter) => prevCounter + 1);
   };

   const removeFriend = (index) => () => {
     setIndexes((prevIndexes) => [
       ...prevIndexes.filter((item) => item !== index),
     ]);
     setCounter((prevCounter) => prevCounter - 1);
   };

   const clearFriends = () => {
     setIndexes([]);
   };

  return (
    <Form
      onSubmit={handleSubmit(onSubmit)}
      data-netlify="true"
      name="rsvp"
      method="POST"
      action="/thank-you/"
      netlify-honeypot="bot-field"
    >
      {data.map((item, index) => (
        <Row key={item.id} className="m-3 border border-muted p-3">
          <Col xs={12} md={3}>
            <Controller
              name={`firstname_${index}`}
              control={control}
              defaultValue=""
              render={({ onChange, onBlur, ref, value }) => (
                <Label className="w-100">
                  <ElementText>First name</ElementText>
                  <Input
                    type="text"
                    onChange={onChange}
                    onBlur={onBlur}
                    innerRef={ref}
                    value={value}
                    placeholder="Jane"
                    className="w-100 rounded-0"
                  />
                </Label>
              )}
            />
          </Col>
          <Col xs={12} md={3}>
            <Controller
              name={`lastname_${index}`}
              control={control}
              defaultValue=""
              render={({ onChange, onBlur, ref, value }) => (
                <Label className="w-100">
                  <ElementText>Last name</ElementText>
                  <Input
                    type="text"
                    onChange={onChange}
                    onBlur={onBlur}
                    innerRef={ref}
                    value={value}
                    placeholder="Doe"
                    className="w-100 rounded-0"
                  />
                </Label>
              )}
            />
          </Col>
          <Col xs={12} md={3}>
            <Controller
              name={`dinner_${index}`}
              control={control}
              defaultValue="Here"
              render={({ onChange, onBlur, value, ref }) => (
                <Label className="w-100">
                  <ElementText>Dinner</ElementText>
                  <Input
                    type="select"
                    className="w-100 rounded-0"
                    innerRef={ref}
                    onBlur={onBlur}
                    selected={value}
                    onChange={onChange}
                  >
                    <option value="Here">Here</option>
                    <option value="We">We</option>
                    <option value="Go">Go</option>
                  </Input>
                </Label>
              )}
            />
          </Col>
          <Col xs={6} md={2}>
            <Controller
              name={`over21_${index}`}
              control={control}
              defaultValue={false}
              render={({ onChange, onBlur, value, ref }) => (
                <Label className="w-100">
                  <ElementText>Over 21?</ElementText>
                  <Input
                    type="checkbox"
                    className="d-none"
                    onBlur={onBlur}
                    innerRef={ref}
                    checked={value}
                    onChange={(e) => onChange(e.target.checked)}
                  />
                  {value ? (
                    <div className="d-block btn rounded-0 btn-dark w-100">
                      &#10003; Yes
                    </div>
                  ) : (
                    <div className="d-block btn rounded-0 btn-outline-dark w-100">
                      Yes
                    </div>
                  )}
                </Label>
              )}
            />
          </Col>
          <Col
            xs={6}
            md={1}
            className="d-flex justify-content-center align-items-center"
          >
            {index !== 0 ? (
              <Button
                color="danger"
                outline
                className="border-0 mt-3 rounded-0"
                onClick={() => remove(index)}
              >
                Remove
              </Button>
            ) : null}
          </Col>
        </Row>
      ))}
      <Row className="my-3">
        <Col xs={12} md={3}>
          <Button
            className="btn-light text-dark rounded-0 w-100"
            onClick={() => {
              append();
            }}
          >
            + Add guest
          </Button>
        </Col>
      </Row>
      <Row className="justify-content-end my-4">
        <Col xs={6} md={3}>
          <Input className="btn-dark rounded-0" type="submit" />
        </Col>
      </Row>
    </Form>
  );
}

export default RsvpForm