import { useCallback, useState } from 'react'
import { components as Components } from '../../../server/api.gen'
import { ButtonPrimary, ButtonTertiary } from '../../components/Button'
import Choices from '../../components/Choices'
import Dialog from '../../components/Dialog'
import Dropdown from '../../components/Dropdown'
import { NumberField, TextField } from '../../components/InputField'
import Typography from '../../components/Typography'
import TypographyToken from '../../designTokens/typography'

type Product = Components['schemas']['Product']
type Unit = Components['schemas']['Unit']

function emptyProduct(): Omit<Product, 'id'> {
  return {
    type: 'product',
    name: '',
    description: '',
    price: 0,
    vat: 0,
    unit: '',
  }
}

interface ProductTypeChoice {
  id: Product['type']
  label: string
}

const productTypes: ProductTypeChoice[] = [
  { id: 'product', label: 'Product' },
  { id: 'service', label: 'Service' },
]

interface VatChoice {
  id: number
  label: string
}

const vatOptions: VatChoice[] = [
  { id: 0, label: '0%' },
  { id: 10, label: '10%' },
  { id: 13, label: '13%' },
  { id: 16, label: '16%' },
  { id: 19, label: '19%' },
  { id: 20, label: '20%' },
  { id: 21, label: '21%' },
  { id: 22, label: '22%' },
  { id: 30, label: '30%' },
]

interface AddProductButtonProps {
  onAddUnit: (unit: { name: string }) => Promise<Unit>
  units: Unit[]
}

export default function AddProductButton({ onAddUnit, units }: AddProductButtonProps) {
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [newProduct, setNewProduct] = useState(emptyProduct())

  const addNewUnit = useCallback(
    async (name: string, added: () => void) => {
      const newUnit = await onAddUnit({ name })
      setNewProduct((prev) => ({ ...prev, unit: newUnit.id }))
      added()
    },
    [onAddUnit],
  )

  return (
    <>
      <ButtonPrimary disabled={isDialogOpen} onClick={() => setIsDialogOpen(true)}>
        Add new
      </ButtonPrimary>
      {isDialogOpen ? (
        <Dialog
          footer={(closeDialog) => (
            <>
              <ButtonTertiary onClick={closeDialog}>Cancel</ButtonTertiary>
              <ButtonPrimary onClick={closeDialog}>Add</ButtonPrimary>
            </>
          )}
          onClose={() => setIsDialogOpen(false)}
          title={<Typography textToken={TypographyToken.textStyleTextLabelsDefaultBold}>Add new product</Typography>}
        >
          <Choices
            choices={productTypes}
            onSelected={(type) => setNewProduct((prev) => ({ ...prev, type }))}
            selectedChoices={[newProduct.type]}
          />

          <TextField
            label="Product name"
            onChange={(name) => setNewProduct((prev) => ({ ...prev, name }))}
            value={newProduct.name}
          />

          <TextField
            label="Description"
            onChange={(description) => setNewProduct((prev) => ({ ...prev, description }))}
            value={newProduct.description}
          />

          <Dropdown
            addNewLabel="Select a unit or start typing to create a new one"
            choices={units.map((unit) => ({ id: unit.id, label: unit.name }))}
            canAddNew
            label="Units"
            onAddNew={addNewUnit}
            onSelected={(unit) => setNewProduct((prev) => ({ ...prev, unit: unit.toString() }))}
            value={newProduct.unit}
          />

          <NumberField
            label="Unit price (net)"
            onChange={(price) => setNewProduct((prev) => ({ ...prev, price: price * 100 }))}
            symbol="€"
            value={newProduct.price / 100}
          />

          <Dropdown
            choices={vatOptions}
            label="VAT"
            onSelected={(value) => setNewProduct((prev) => ({ ...prev, vat: parseInt(value.toString()) * 100 }))}
            value={(newProduct.vat / 100).toFixed(0)}
          />
        </Dialog>
      ) : null}
    </>
  )
}
