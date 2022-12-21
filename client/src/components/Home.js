import {useState, useEffect} from 'react';
import Card from 'react-bootstrap/Card';
const bankImageUrl = process.env.REACT_APP_SERVER_URL+'bank.png'

const Home = () => {
    const [img, setImg] = useState();

    const fetchImage = async () => {
      const res = await fetch(bankImageUrl);
      const imageBlob = await res.blob();
      const imageObjectURL = URL.createObjectURL(imageBlob);
      setImg(imageObjectURL);
    };

    useEffect(() => {
        fetchImage();
      }, []);
    return(
        <>
        <Card style={{height:'50%', width:'50%'}} bg={'info'} text={'dark'}>
            <Card.Header>The Financial Crimes Home Page</Card.Header>
            <Card.Body>
                <Card.Title>Welcome to the bank</Card.Title>
                <Card.Text>
                    Welcome to the Bank that does not allow you to steal but also protects your savings.
                    You can navigate through the website using the navigation bar. 
                    Good Luck!
                </Card.Text>
                <Card.Img variant="bottom" src={img} className="img-fluid"/>
            </Card.Body>
        </Card>
        </>
    );
};

export default Home