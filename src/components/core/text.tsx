import { colorTextActive } from '../../constant';
interface Props {
    text: string;
}
function Text(props: Props) {
    const { text } = props
    return (
        <span className={`${colorTextActive} cursor-pointer select-none hover:${colorTextActive} transition-all duration-300 text-[14px]`}>{text}</span>
    )
}

export default Text