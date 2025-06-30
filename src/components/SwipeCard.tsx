interface Props {
    data: {
        title: string;
        description: string;
        image: string;
    };
    style?: React.CSSProperties;
    isActive: boolean;
    index: number;
}

export default function SwipeCard({ data, style }: Props) {
    return (
        <div
            className="absolute top-0 left-0 w-full h-full bg-cover bg-no-repeat bg-center text-white p-4 transition-transform duration-300 ease-in-out"
            style={{
                backgroundImage: `url(${data.image})`,
                ...style,
            }}
        >
            <div className="bg-black bg-opacity-40 p-4 rounded-xl mt-10 max-w-lg mx-auto">
                <h2 className="text-2xl font-bold">{data.title}</h2>
                <p className="mt-2 text-lg">{data.description}</p>
            </div>
        </div>
    );
}
