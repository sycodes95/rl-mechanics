import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import getMechanicDetails from "../../utils/getMechanicDetails";

type MechanicDetails = {
  mech_created_at: string | null;
  mech_description: string | null;
  mech_difficulty: number | null;
  mech_id: number | null;
  mech_importance: number | null;
  mech_name: string;
  mech_url: string;
  mech_yt_url_controller: string | null;
  mech_yt_url_kbm: string | null;
};

function MechanicDetails() {
  const { mech_url } = useParams();
  const [mechanicDetails, setMechanicDetails] = useState<null | MechanicDetails>(null);
  useEffect(() => {
    if (mech_url)
      getMechanicDetails(mech_url)?.then((details) =>
        setMechanicDetails(details)
      );
  }, [mech_url]);

  useEffect(() => {
    console.log(mechanicDetails);
  }, [mechanicDetails]);

  return (
    <div className="flex justify-center w-full "> 
      <div className="w-full max-w-5xl bg-black bg-opacity-50 ">
        <section className="flex justify-between p-4"> 
          <div className="flex items-center text-4xl text-white">
            {mechanicDetails?.mech_name}
          </div>
          <div
            className="grid w-1/2 grid-cols-2 gap-4 p-2 text-sm text-white bg-black bg-opacity-20 "
          >
            <section className="grid grid-rows-2">
              <div className="flex gap-4">
                <p>DIFFICULTY</p>
                <p>*****</p>
              </div>
              <div>
                <p>IMPORTANCE</p>
              </div>
            </section>
            <section>
              <div>
                <p>USER RATED DIF.</p>
              </div>
              <div>
                <p>USER RATED IMP.</p>
              </div>
            </section>
          </div>
        </section>
        <section className="flex flex-col items-center ">
          <div className="relative w-full h-96">
            {mechanicDetails?.mech_yt_url_controller && (
              <div
                dangerouslySetInnerHTML={{
                  __html: mechanicDetails.mech_yt_url_controller,
                }}
              ></div>
            )}
          </div>

          <div className="w-full p-2 text-xs text-white bg-black bg-opacity-25">
            <p className="text-xl text-center border-b border-white">
              DESCRIPTION
            </p>
            <p className="p-2">
              {mechanicDetails?.mech_description?.toUpperCase()}
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}

export default MechanicDetails;
