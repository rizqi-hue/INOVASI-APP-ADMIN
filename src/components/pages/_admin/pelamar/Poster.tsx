import { useRecordContext } from "react-admin";
const Poster = () => {
  const record = useRecordContext<any>();
  if (!record) return null;
  return (
    <>
      <iframe id="pdf-js-viewer" src={`${import.meta.env.VITE_BASEURL}/images/pelamar/${record.image}`} title="webviewer" width="500" height="600"></iframe>
      <iframe />
    </>
  );
};

export default Poster;
