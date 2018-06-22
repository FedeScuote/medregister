/*
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

'use strict';
/**
 * Write your transction processor functions here
 */

/**
 * CreateMedicalRegistry Transaction
 * @param {medreg.CreateMedicalRegistry} createMedicalRegistry
 * @transaction
 */
async function createMedicalRegistry(tx) {
    
    tx.asset.division = tx.doctor.division;
    tx.asset.owener = tx.doctor;
    tx.asset.description = tx.description;

    // Get the asset registry for the asset.
    const assetRegistry = await getAssetRegistry('medreg.CreateMedicalRegistry');
    // Update the asset in the asset registry.
    await assetRegistry.update(tx.asset);
    
    // Emit an event for the modified asset.
    let event = getFactory().newEvent('medreg', 'CreateMedicalRegistryEvent');
    event.asset = tx.asset;
    event.description = tx.description;
    event.doctor = tx.doctor;
    emit(event);
}
