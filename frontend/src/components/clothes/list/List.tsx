import './List.css'
import { ChangeEvent, useEffect, useRef, useState } from 'react'
import Card from '../card/Card'
import { useLocation, useSearchParams } from 'react-router-dom'
import Item from '../../../models/item/Item'
import Category from '../../../models/category/Category'
import categoriesServices from '../../../services/categories'
import itemsServices from '../../../services/items'
import { Toast } from 'primereact/toast'

export default function List(): JSX.Element {

    const toast = useRef<Toast | null>(null)
    const [categories, setCategories] = useState<Category[]>([])
    const [items, setItems] = useState<Item[]>([])
    const location = useLocation()
    const newItemId = location.state?.newItemId
    const categoryChosen = location.state?.categoryChosen
    const [searchParams] = useSearchParams();
    const searchTerm = searchParams.get('search') || '';

    useEffect(() => {
        (async () => {
            try {
                const categories = await categoriesServices.getCategories()
                setCategories(categories)

                if (categoryChosen) {
                    const categoryItems = await itemsServices.getItemsPerCategory(categoryChosen)
                    setItems(categoryItems)
                }

                else if (searchTerm) {
                    const allItems = await itemsServices.getAllItems()
                    const filteredItems = allItems.filter(item =>
                        item.name.toLowerCase().includes(searchTerm.toLowerCase()))
                    setItems(filteredItems)
                } else {
                    const allItems = await itemsServices.getAllItems()
                    setItems(allItems)
                }
            } catch {
                toast.current?.show({
                    severity: 'error',
                    summary: 'Error',
                    detail: `Failed to load page`,
                    life: 3000
                })
            }
        })()
    }, [searchTerm, categoryChosen])

    async function categoryChanged(event: ChangeEvent<HTMLSelectElement>) {
        try {
            const selectedCategoryId = event.currentTarget.value
            if (selectedCategoryId) {
                const items = await itemsServices.getItemsPerCategory(selectedCategoryId)
                setItems(items)
            } else {
                const allItems = await itemsServices.getAllItems()
                setItems(allItems)
            }
        } catch {
            toast.current?.show({
                severity: 'error',
                summary: 'Error',
                detail: `Failed to load content from server`,
                life: 3000
            })
        }
    }


    function removeItem(id: string) {
        setItems(items.filter(item => item.id !== id))
    }

    return (
        <div className='List'>
            <Toast ref={toast} />
            <select onChange={categoryChanged} defaultValue={categoryChosen ? categoryChosen : ""}>
                <option value="" disabled>Select Category...</option>
                {categories.map(({ id, name }) => <option key={id} value={id}>{name}</option>)}
            </select>

            <div className='CardContainer'>
                {items.map(item =>
                    <Card
                        key={item.id}
                        item={item}
                        removeItem={removeItem}
                        isNew={item.id === newItemId}
                    />
                )}
            </div>
        </div>
    )
}