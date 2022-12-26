import React, { useState } from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { CategoryRecordType, CategoryType } from '../../redux/catReducer';
import Button from '@mui/material/Button';
import { TagRecordType } from '../../redux/tagReducer';
import { ButtonAddItem } from './ButtonAddItem';
import { DialogFormTags } from './DialogFormTags';
import { DialogFormCategories } from './DialogFormCategories';
import { DialogFormEvents } from './DialogFormEvents';
import { EventRecordType } from '../../redux/eventReducer';
import { ThemeRecordType, ThemeType } from '../../redux/themeReducer';
import { RuleRecordType, RuleType } from '../../redux/ruleReducer';
import { DialogFormTheme } from './DialogFormTheme';
import { DialogFormRule } from './DialogFormRule';
import { ACTION_OF_CRUD, DELETE, UPDATE } from '../../redux/appReducer';
import { TAG } from './PageTags';
import { CATEGORY } from './PageCategories';
import { EVENT } from './PageDataEvents';
import { THEME } from './PageThemes';
import { RULE } from './PageRules';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
   [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
   },
   [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
   },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
   '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
   },
   // hide last border
   '&:last-child td, &:last-child th': {
      border: 0,
   },
}));

const dilaogForms = {
   tag: (openDilaog: boolean, setOpenDialog: (arg1: boolean) => void, itemId: number, item: TagRecordType, handleConfirm: (id?: number, field?: TagRecordType) => void, setItem: (arg1: TagRecordType | undefined) => void, switchHandler: ACTION_OF_CRUD) => {
      return <DialogFormTags
         openDilaog={openDilaog}
         setOpenDialog={setOpenDialog}
         itemId={itemId}
         item={item}
         handleConfirm={handleConfirm}
         switchHandler={switchHandler}
         setItem={setItem}
      />
   },
   category: (openDilaog: boolean, setOpenDialog: (arg1: boolean) => void, itemId: number, item: CategoryRecordType, handleConfirm: (id?: number, field?: CategoryRecordType) => void, setItem: (arg1: CategoryRecordType | undefined) => void, switchHandler: ACTION_OF_CRUD) => {
      return <DialogFormCategories
         openDilaog={openDilaog}
         setOpenDialog={setOpenDialog}
         itemId={itemId}
         item={item}
         handleConfirm={handleConfirm}
         switchHandler={switchHandler}
         setItem={setItem}
      />
   },
   event: (openDilaog: boolean, setOpenDialog: (arg1: boolean) => void, itemId: number, item: EventRecordType, handleConfirm: (id?: number, field?: EventRecordType) => void, setItem: (arg1: EventRecordType | undefined) => void, switchHandler: ACTION_OF_CRUD) => {
      return <DialogFormEvents openDilaog={openDilaog}
         setOpenDialog={setOpenDialog}
         itemId={itemId}
         item={item}
         handleConfirm={handleConfirm}
         setItem={setItem}
         switchHandler={switchHandler}
      />
   },
   theme: (openDilaog: boolean, setOpenDialog: (arg1: boolean) => void, itemId: number, item: ThemeRecordType, handleConfirm: (id?: number, field?: ThemeRecordType) => void, setItem: (arg1: ThemeRecordType | undefined) => void, switchHandler: ACTION_OF_CRUD) => {
      return <DialogFormTheme
         openDilaog={openDilaog}
         setOpenDialog={setOpenDialog}
         itemId={itemId}
         item={item}
         handleConfirm={handleConfirm}
         setItem={setItem}
         switchHandler={switchHandler}
      />
   },
   rule: (openDilaog: boolean, setOpenDialog: (arg1: boolean) => void, itemId: number, item: RuleRecordType, handleConfirm: (id?: number, field?: RuleRecordType) => void, setItem: (arg1: RuleRecordType | undefined) => void, switchHandler: ACTION_OF_CRUD) => {
      return <DialogFormRule
         openDilaog={openDilaog}
         setOpenDialog={setOpenDialog}
         itemId={itemId}
         item={item}
         handleConfirm={handleConfirm}
         setItem={setItem}
         switchHandler={switchHandler}
      />
   },
}

type allSimpleItemType = CategoryType | TagRecordType | EventRecordType | ThemeType | RuleType
type allSimpleItemRecordType = CategoryRecordType | TagRecordType | EventRecordType | ThemeRecordType | RuleRecordType | undefined


type TableItemsType = {
   list: Array<allSimpleItemType>
   setSwitchHandler: (arg1: ACTION_OF_CRUD) => void
   handleConfirm: (id?: number, field?: allSimpleItemRecordType) => void
   typeDialog: string
   switchHandler: ACTION_OF_CRUD
}
export const TableSimpleItem: React.FC<TableItemsType> = React.memo(({ list, setSwitchHandler, handleConfirm, typeDialog, switchHandler }) => {

   const [openDilaog, setOpenDialog] = useState(false)
   const [itemId, setItemId] = useState<number>(0)
   const [item, setItem] = useState<allSimpleItemRecordType>(undefined)
   const renderDialogForm = () => {
      switch (typeDialog) {
         case TAG: {
            return dilaogForms.tag(openDilaog, setOpenDialog, itemId, item as TagRecordType, handleConfirm, setItem, switchHandler)
         }
         case CATEGORY: {
            return dilaogForms.category(openDilaog, setOpenDialog, itemId, item as CategoryRecordType, handleConfirm, setItem, switchHandler)
         }
         case EVENT: {
            return dilaogForms.event(openDilaog, setOpenDialog, itemId, item as EventRecordType, handleConfirm, setItem, switchHandler)
         }
         case THEME: {
            return dilaogForms.theme(openDilaog, setOpenDialog, itemId, item as ThemeRecordType, handleConfirm, setItem, switchHandler)
         }
         case RULE: {
            return dilaogForms.rule(openDilaog, setOpenDialog, itemId, item as RuleRecordType, handleConfirm, setItem, switchHandler)
         }
         default: return 'Type of dialog form not found';
      }
   }
   return (
      <>
         <ButtonAddItem setOpenDialog={setOpenDialog} setSwitchHandler={setSwitchHandler} />
         <TableContainer component={Paper}>
            <Table aria-label="customized table">
               <TableHead>
                  <TableRow>
                     <StyledTableCell>#id</StyledTableCell>
                     <StyledTableCell align="right">Title</StyledTableCell>
                     <StyledTableCell align="right">Description</StyledTableCell>
                     <StyledTableCell align="right">textUrl</StyledTableCell>

                     <StyledTableCell align="right">Actions</StyledTableCell>
                     <StyledTableCell align="right"></StyledTableCell>

                  </TableRow>
               </TableHead>
               <TableBody>
                  {list && list.map((row) => (
                     <StyledTableRow key={row.id}>
                        <StyledTableCell component="th" scope="row">
                           #{row.id}
                        </StyledTableCell>
                        <StyledTableCell align="right">
                           {row.title}
                        </StyledTableCell>
                        <StyledTableCell align="right">
                           {row.description}
                        </StyledTableCell>
                        <StyledTableCell align="right">
                           {//@ts-ignore
                              row?.textUrl && row.textUrl}
                        </StyledTableCell>
                        <StyledTableCell align="right">
                           <Button onClick={() => { setSwitchHandler(UPDATE); setItem(row); setItemId(row.id as number); setOpenDialog(true) }}>
                              Update
                           </Button>
                        </StyledTableCell>
                        <StyledTableCell align="right">
                           <Button onClick={() => { setSwitchHandler(DELETE); setItem(undefined); setItemId(row.id as number); setOpenDialog(true) }}>
                              Delete
                           </Button>
                        </StyledTableCell>

                     </StyledTableRow>
                  ))}
               </TableBody>
            </Table>
         </TableContainer>
         {renderDialogForm()}
      </>
   );
})
