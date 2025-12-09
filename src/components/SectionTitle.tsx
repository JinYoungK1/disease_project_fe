interface Props {
  title: string | JSX.Element;
}

function SectionTitle({ title = '' }: Props) {
  return (
    <h2 className="mr-4 text-lg font-semibold text-gray-800 whitespace-wrap" style={{width:'500px'}}>
      {title ?? ''}
    </h2>
  );
}

export default SectionTitle;
