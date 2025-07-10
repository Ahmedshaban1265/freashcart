export default function Category(props) {
    return <>
        <div  className="col-6 col-md-3 g-5">
            <div className="shadow-sm border border-light rounded-4 p-3 cursor-pointer h-100"  >
                <img src={props.val.image} className="w-100 h-75"  alt="..." />
                <div className="py-2">
                    <h5 className=" text-main text-center">{props.val.name}</h5>
                </div>
            </div>
        </div>
    </>
}