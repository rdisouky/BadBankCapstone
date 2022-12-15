import Card from 'react-bootstrap/Card';

const Home = () => {
    return(
        <Card style={{height:'50rem', width:'50rem'}} bg={'info'} text={'dark'}>
            <Card.Header>The Financial Crimes Home Page</Card.Header>
            <Card.Body>
                <Card.Title>Welcome to the bank</Card.Title>
                <Card.Text>
                    Welcome to the Bank that allows you to steal but also does not protect your savings.
                    You can navigate through the website using the navigation bar. 
                    Good Luck and do NOT get Caught!
                </Card.Text>
                <Card.Img variant="bottom" src="bank.png/100px180" />
            </Card.Body>
        </Card>
    );
    // return (
    //     <Card
    //       height="50rem"
    //       width="50em"
    //       bgcolor="info"
    //       txtcolor="black"
    //       //header="The Financial Crimes Home Page"
    //       title="Welcome to the bank"
    //       text="  Welcome to the Bank that allows you to steal but also does not protect your savings.
    //       You can navigate through the website using the navigation bar. 
    //       Good Luck and do NOT get Caught!."
    //       body={(<img src="bank.png" className="img-fluid" alt="Responsive image"/>)}
    //     />    
    //   );  
};

export default Home