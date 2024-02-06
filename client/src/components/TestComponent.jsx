
export default function TestComponent (props) {

    const {test1, test2} = props
    console.log("test1", test1.data.me)
    console.log("test2", test2.data.users)
    // const me = myDataQuery.myDataQuery.me
    return (
        <div>
            <p>Enjoy this sandbox page!</p>            
            {/* <div>{me.username}</div> */}
            {/* <div>{me.email}</div> */}
        </div>
    )
};

