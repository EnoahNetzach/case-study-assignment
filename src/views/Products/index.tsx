import Typography from '../../components/Typography'
import TypographyToken from '../../designTokens/typography'
import Spacer from '../../components/Spacer'
import SpaceToken from '../../designTokens/space'
import { ButtonSecondary } from '../../components/Button'
import PageLayout from '../../components/PageLayout'
import Table from '../../components/Table'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import * as productApi from '../../api/product'
import * as unitApi from '../../api/unit'
import { useMemo, useState } from 'react'
import useGlobalAlert from '../../hooks/useGlobalAlert.ts'
import AddProductButton from './AddProductButton'

export default function ProductsView() {
  const addAlert = useGlobalAlert()

  const queryClient = useQueryClient()

  const unitListQuery = useQuery({ queryKey: ['unit#list'], queryFn: unitApi.getList })
  const productListQuery = useQuery({ queryKey: ['product#list'], queryFn: productApi.getList })

  const addUnit = useMutation({
    mutationFn: unitApi.add,
    onSuccess: async (data) => {
      addAlert(`Unit "${data.name}" added as a new measuring unit`)
      await queryClient.invalidateQueries({ queryKey: ['unit#list'] })
    },
  })

  const [selectedItems, setSelectedItems] = useState<Set<string>>(new Set())

  const products = useMemo(() => {
    return (
      productListQuery.data?.records?.map((product) => {
        const unit = unitListQuery.data?.records?.find((unit) => unit.id === product.unit)

        return {
          ...product,
          unit: unit?.name ?? '',
          selected: selectedItems.has(product.id),
          onSelect: (selected: boolean) => {
            setSelectedItems((prev) => {
              if (selected && !prev.has(product.id)) {
                return new Set([...prev, product.id])
              } else if (!selected && prev.has(product.id)) {
                return new Set([...prev].filter((id) => id !== product.id))
              }

              return prev
            })
          },
        }
      }) ?? []
    )
  }, [productListQuery.data?.records, selectedItems, unitListQuery.data?.records])

  return (
    <PageLayout
      header={
        <div style={{ alignItems: 'baseline', display: 'flex', justifyContent: 'space-between' }}>
          <div>
            <Typography textToken={TypographyToken.textStyleHeadingsTitlesBoldHuge}>Header</Typography>
            <Spacer spaceToken={SpaceToken.space300} />
            <ButtonSecondary>Guide me!</ButtonSecondary>
          </div>

          <div>
            <AddProductButton onAddUnit={addUnit.mutateAsync} units={unitListQuery.data?.records ?? []} />
          </div>
        </div>
      }
    >
      <Table
        headers={[
          { id: 'name', label: 'Name' },
          { id: 'type', label: 'Type' },
          { id: 'unit', label: 'Unit' },
          { id: 'price', label: 'Price' },
          { id: 'vat', label: 'VAT' },
        ]}
        items={products}
        selectable
      />
    </PageLayout>
  )
}
