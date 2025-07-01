export default function Category(props) {
    return <>
        <div  className="col-md-3 g-5">
            <div className="shadow-sm border border-light rounded-4 p-3 cursor-pointer"  >
                <img src={props.val.image} className="w-100" height={300} alt="..." />
                <div className="py-2">
                    <h5 className=" text-main text-center">{props.val.name}</h5>
                </div>
            </div>
        </div>
    </>
}