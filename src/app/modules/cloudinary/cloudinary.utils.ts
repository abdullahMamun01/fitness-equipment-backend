


const baseUrl = 'https://res.cloudinary.com/db5a7lbio/image/upload'

const imageUrlParser = (public_id: string, format: string = 'webp'): string => {

    return `${baseUrl}/${public_id}.${format}?q_auto`;
}

export default imageUrlParser