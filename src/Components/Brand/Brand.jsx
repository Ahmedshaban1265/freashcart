export default function Brand(props) {
    return <>
        <div  className="col-6 col-md-3 g-5">
                            <div className="shadow-sm border border-light rounded-4 p-3 cursor-pointer"  >
                                    <img src={props.val.image} className="w-100" alt="..." />
                                    <div className="py-2">
                                        <h5 className=" text-main">{props.val.name}</h5>
                                    </div>
                            </div>
                        </div>
    </>
}